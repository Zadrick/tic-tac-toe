# Tic-tac-toe UML

```mermaid
---
title: Tic-tac-toe
---

	classDiagram
    class IMatrixCoordinates {
        <<interface>>

        + Number x
        + Number y
    }

    Matrix --> IMatrixCoordinates
    class Matrix {
        - Array2D rows
        - Array2D columns
        - Array2D diagonals

        + set(IMatrixCoordinates)
        + get(IMatrixCoordinates, value)
    }

    class PlayerXLinkedListNode {
        + PlayerX value
        + PlayerO next
    }

    class PlayerOLinkedListNode {
        + PlayerO value
        + PlayerX next
    }

    PlayerXLinkedListNode *-- PlayersLinkedList
    PlayerOLinkedListNode *-- PlayersLinkedList
    class PlayersLinkedList {
        PlayerXLinkedListNode value
        PlayerOLinkedListNode next
    }

    Matrix *-- Board
    Board --> IMatrixCoordinates
    PlayersLinkedList *-- Board
    class Board {
        + Matrix data
        + IPlayer turnOfPlayer
        - PlayersLinkedList playersLinkedList

        + iteratePlayerTurn()
        + markMove(IMatrixCoordinates)
        + hasCurrentPlayerWon() Boolean
    }

    class GameSides {
        <<enumeration>>
        + X
        + O
    }

    GameSides *-- IPlayer
    Board *-- IPlayer

    class IPlayer {
        <<interface>>
        + GameSides side
        + Board board

        +markMove()
    }

    PlayerX ..|> IPlayer
    class PlayerX {

    }

    PlayerO ..|> IPlayer
    class PlayerX {
        
    }

```