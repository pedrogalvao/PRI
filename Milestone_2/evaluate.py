# SETUP
import matplotlib.pyplot as plt
from sklearn.metrics import PrecisionRecallDisplay
import numpy as np
import json
import requests
import pandas as pd


def metrics_table(results, relevant):

    # METRICS TABLE
    # Define custom decorator to automatically calculate metric based on key
    metrics = {}
    def metric(f): return metrics.setdefault(f.__name__, f)

    @metric
    def ap(results, relevant):
        """Average Precision"""
        precision_values = [
            len([
                doc
                for doc in results[:idx]
                if doc['id'] in relevant
            ]) / idx
            for idx in range(1, len(results))
        ]
        return sum(precision_values)/len(precision_values)

    @metric
    def p10(results, relevant, n=10):
        """Precision at N"""
        return len([doc for doc in results[:n] if doc['id'] in relevant])/n

    def calculate_metric(key, results, relevant):
        return metrics[key](results, relevant)

    # Define metrics to be calculated
    evaluation_metrics = {
        'ap': 'Average Precision',
        'p10': 'Precision at 10 (P@10)'
    }

    # Calculate all metrics and export results as LaTeX table
    df = pd.DataFrame([['Metric', 'Value']] +
                      [
        [evaluation_metrics[m], calculate_metric(m, results, relevant)]
        for m in evaluation_metrics
    ]
    )

    return df


def precision_call_curve(results, relevant):

    # PRECISION-RECALL CURVE
    # Calculate precision and recall values as we move down the ranked list
    precision_values = [
        len([
            doc
            for doc in results[:idx]
            if doc['id'] in relevant
        ]) / idx
        for idx, _ in enumerate(results, start=1)
    ]

    recall_values = [
        len([
            doc for doc in results[:idx]
            if doc['id'] in relevant
        ]) / len(relevant)
        for idx, _ in enumerate(results, start=1)
    ]

    precision_recall_match = {k: v for k,
                              v in zip(recall_values, precision_values)}

    # Extend recall_values to include traditional steps for a better curve (0.1, 0.2 ...)
    recall_values.extend([step for step in np.arange(
        0.1, 1.1, 0.1) if step not in recall_values])
    recall_values = sorted(set(recall_values))

    # Extend matching dict to include these new intermediate steps
    for idx, step in enumerate(recall_values):
        if step not in precision_recall_match:
            if recall_values[idx-1] in precision_recall_match:
                precision_recall_match[step] = precision_recall_match[recall_values[idx-1]]
            else:
                precision_recall_match[step] = precision_recall_match[recall_values[idx+1]]

    disp = PrecisionRecallDisplay(
        [precision_recall_match.get(r) for r in recall_values], recall_values)
    disp.plot()
    plt.savefig('precision_recall.pdf')


def qrelFiles():
    qrels = []
    for index in range(1, 2):
        qrels.append(f'Qrels/query_{index}.txt')
    return qrels


QRELS_FILE = 'Qrels/query_1.txt'
QUERY_URL = 'http://localhost:8983/solr/news/query?q=(%0A%20%20%20%20(title:%22pol%C3%ADtica%22%20OR%20title:%22governo%22%20OR%20title:%22partido%22)%5E2%20OR%20(text:%22pol%C3%ADtica%22%20OR%20text:%22governo%22%20OR%20text:%22partido%22)%0A%20%20%20%20OR%20(tags:%22Aut%C3%A1rquicas2021%22%20OR%20tags:%22PSD%22)%0A)%20AND%20datetime:%5B%20NOW-1MONTHS%20TO%20NOW%5D&q.op=OR&indent=true&wt=json'


# Read qrels to extract relevant documents
relevant = list(map(lambda el: el.strip(), open(QRELS_FILE).readlines()))
# Get query results from Solr instance
results = requests.get(QUERY_URL).json()['response']['docs']

with open('results.tex', 'w') as tf:
    tf.write(metrics_table(results, relevant).to_latex())

precision_call_curve(results, relevant)
