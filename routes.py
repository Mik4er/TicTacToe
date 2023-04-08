# routes.py
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

board = ["", "", "", "", "", "", "", "", ""]
current_player = "X"


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/play", methods=["GET"])
def play():
    global board, current_player

    cell_number = int(request.form["cell"])

    if board[cell_number] != "":
        return jsonify({"error": "Cell is already occupied."}), 400

    board[cell_number] = current_player

    if check_winner() == current_player:
        return jsonify({"winner": current_player})
    elif check_tie():
        return jsonify({"tie": True})

    current_player = "O" if current_player == "X" else "X"

    return jsonify({"player": current_player})


@app.route("/reset", methods=["GET"])
def reset():
    global board, current_player

    board = ["", "", "", "", "", "", "", "", ""]
    current_player = "X"
    return jsonify({"": True})


def check_winner():
    for i in range(0, 9, 3):
        if board[i] == board[i + 1] == board[i + 2] != "":
            return board[i]

    for i in range(3):
        if board[i] == board[i + 3] == board[i + 6] != "":
            return board[i]

    if board[0] == board[4] == board[8] != "":
        return board[0]

    if board[2] == board[4] == board[6] != "":
        return board[2]

    return None


def check_tie():
    return all(cell != "" for cell in board)


if __name__ == "__main__":
    app.run(debug=True)
