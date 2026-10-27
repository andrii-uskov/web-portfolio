import csv

FILE = "expenses.csv"


def add_expense():
    while True:
        try:
            amount = float(input("Amount: ").replace(",", "."))
            break
        except ValueError:
            print("Bitte eine Zahl eingeben (z. B. 12.5)")
    category = input("Category: ").strip().lower()
    with open(FILE, "a", newline="", encoding="utf-8") as f:
        csv.writer(f).writerow([amount, category])
    print(f"Saved: {amount:.2f} EUR - {category}")


def show_totals():
    totals = {}
    try:
        with open(FILE, encoding="utf-8") as f:
            for row in csv.reader(f):
                totals[row[1]] = totals.get(row[1], 0) + float(row[0])
    except FileNotFoundError:
        print("No expenses yet.")
        return
    print("\nTotal by category:")
    for name, total in totals.items():
        print(f"{name}: {total:.2f} EUR")
    print(f"All: {sum(totals.values()):.2f} EUR")


while True:
    print("\n1. Add expense\n2. Show totals\n3. Exit")
    choice = input("Choose: ")
    if choice == "1":
        add_expense()
    elif choice == "2":
        show_totals()
    elif choice == "3":
        break
    else:
        print("Please choose 1, 2 or 3.")
