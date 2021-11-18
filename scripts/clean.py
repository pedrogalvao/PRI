import pandas


def join_csv(file1, file2, outfile):
    df1 = pandas.read_csv(file1, delimiter=";", encoding="cp1252")
    df2 = pandas.read_csv(file2, delimiter=";", encoding="cp1252")
    print(len(df1))
    print(len(df2))
    joined_df = df1.append(df2)
    print(len(joined_df))
    joined_df = joined_df.sort_values("date").drop_duplicates()
    joined_df.to_csv(outfile, sep=";", index=False)


def remove_null_values(file, outfile):
    df = pandas.read_csv(file, delimiter=";")
    df.describe(include="all", datetime_is_numeric=True).to_csv(
        "describe_before_clean.csv")

    df = df[df['text'].notnull()]
    df = df[df.text != ""]
    df = df[df.title != None]
    df = df[df.title != ""]
    df.to_csv(outfile, sep=";", index=False)


remove_null_values("1000_1500.csv", "data_clean.csv")
#join_csv("data1-5.csv", "data5-29.csv", "data1-29.csv")
#join_csv("data1000_1150.csv", "1154_1172.csv", "data1000_1172.csv")
#join_csv("data1000_1172.csv", "data1150_1500.csv", "data.csv")
