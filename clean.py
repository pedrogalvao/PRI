import pandas

def join_csv(file1, file2, outfile):
    df1 = pandas.read_csv(file1, delimiter=";", encoding = "ISO-8859-1")
    df2 = pandas.read_csv(file2, delimiter=";", encoding = "ISO-8859-1")
    print(len(df1))
    print(len(df2))
    joined_df = df1.append(df2)
    print(len(joined_df))
    joined_df = joined_df.sort_values("date").drop_duplicates()
    joined_df.to_csv(outfile, sep=";", index=False)

def remove_null_values(file):
    df = pandas.read_csv(file1, delimiter=";", encoding = "ISO-8859-1")
    df = df[df.text != None]
    df = df[df.text != ""]
    df = df[df.title != ""]
    df = df[df.title != ""]



join_csv("data1-5.csv", "data5-29.csv", "data1-29.csv")


