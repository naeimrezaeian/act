let a=[
    {
        "type": "text",
        "desc": "Desc1",
        "status": "active",
        "listenLimitCount": 0,
        "fileId": null,
        "id": "3ff008c9-88ff-4df0-be69-56d8803cf160",
        "question": "Question1",
        "answers": [
            {
                "id": "3ff008c9-88ff-4df0-be69-56d8803cf160",
                "answer": "Answer1Q1"
            },
            {
                "id": "3ff008c9-88ff-4df0-be69-56d8803cf161",
                "answer": "Answer2Q1"
            }
        ]
    },
    {
        "type": "text",
        "desc": "Desc2",
        "status": "active",
        "listenLimitCount": 0,
        "fileId": null,
        "id": "3ff008c9-88ff-4df0-be69-56d8803cf161",
        "question": "Question2",
        "answers": [
            {
                "id": "3ff008c9-88ff-4df0-be69-56d8803cf162",
                "answer": "Answer1Q2"
            },
            {
                "id": "3ff008c9-88ff-4df0-be69-56d8803cf163",
                "answer": "Answer2Q2"
            }
        ]
    }
]

let b={
    "type": "text",
    "desc": "Desc1",
    "status": "active",
    "listenLimitCount": 0,
    "fileId": null,
    "id": "3ff008c9-88ff-4df0-be69-56d8803cf160",
    "question": "Question1",
    "answers": [
        {
            "id": "3ff008c9-88ff-4df0-be69-56d8803cf160",
            "answer": "Answer1Q1"
        },
        {
            "id": "3ff008c9-88ff-4df0-be69-56d8803cf161",
            "answer": "Answer2Q1"
        }
    ]
}

let pointer="3ff008c9-88ff-4df0-be69-56d8803cf160"
pointer="3ff008c9-88ff-4df0-be69-56d8803cf161"

let c=a.filter(question => question.id === pointer)[0]

let d=a.indexOf(c)

console.log(d)