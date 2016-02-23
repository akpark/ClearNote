User.destroy_all

u1 = User.create!({username: "user", password: "password"})
u2 = User.create!({username: "guest", password: "password"})
batman = User.create!({username: "batman", password: "superman"})

Notebook.destroy_all

nb1 = Notebook.create(title: "New Notebook", author_id: u2.id)
nb2 = Notebook.create(title: "Philosophy", author_id: u2.id)
nb3 = Notebook.create(title: "Poems", author_id: u2.id)
nb4 = Notebook.create(title: "Resolutions", author_id: u2.id)

Note.destroy_all

n1 = Note.create!({
  title: "Welcome",
  body: "Welcome to Pad. The app to store your thoughts and ideas on a mobile notepad.",
  body_delta: '{"ops":[{"insert":"Welcome to Pad. The app to store your thoughts and ideas on a mobile notepad.\n"}]}',
  author_id: u2.id,
  notebook_id: 1
})

# charles = Note.create({
#   author_id: u1.id,
#   notebook_id: nb3.id,
#   body_delta:
#   '{"ops":[{"insert":"Long walks at night--\nthats whats good for the soul:\npeeking into windows\nwatching tired housewives\ntrying to fight off\ntheir beer-maddened husbands\n\nby Charles Bukowski\n"}]}',
#   title: "And The Moon And The Stars And The World",
#   body:
#   "Long walks at night--\nthat's what's good for the soul:\npeeking into windows\nwatching tired housewives\ntrying to fight off\ntheir beer-maddened husbands\n\nby Charles Bukowski\n">,
# })
#
# poe = Note.create({
#   author_id: u1.id,
#   notebook_id: nb3.id,
#   body_delta:
#   "{\"ops\":[{\"insert\":\"Take this kiss upon the brow!\\nAnd, in parting from you now,\\nThus much let me avow--\\nYou are not wrong, who deem\\nThat my days have been a dream;\\nYet if hope has flown away\\nIn a night, or in a day,\\nIn a vision, or in none,\\nIs it therefore the less gone?\\nAll that we see or seem\\nIs but a dream within a dream.\\nI stand amid the roar\\nOf a surf-tormented shore,\\nAnd I hold within my hand\\nGrains of the golden sand--\\nHow few! yet how they creep\\nThrough my fingers to the deep,\\nWhile I weep--while I weep!\\nO God! can I not grasp\\nThem with a tighter clasp?\\nO God! can I not save\\nOne from the pitiless wave?\\nIs all that we see or seem\\nBut a dream within a dream?\\n\\nBy Edgar Allan Poe\\n\"}]}",
#   title: "Dream within a Dream",
#   body:
#   "Take this kiss upon the brow!\nAnd, in parting from you now,\nThus much let me avow--\nYou are not wrong, who deem\nThat my days have been a dream;\nYet if hope has flown away\nIn a night, or in a day,\nIn a vision, or in none,\nIs it therefore the less gone?\nAll that we see or seem\nIs but a dream within a dream.\nI stand amid the roar\nOf a surf-tormented shore,\nAnd I hold within my hand\nGrains of the golden sand--\nHow few! yet how they creep\nThrough my fingers to the deep,\nWhile I weep--while I weep!\nO God! can I not grasp\nThem with a tighter clasp?\nO God! can I not save\nOne from the pitiless wave?\nIs all that we see or seem\nBut a dream within a dream?\n\nBy Edgar Allan Poe\n">,
# })
#
# hughes = Note.create({
#   author_id: u1.id,
#   notebook_id: nb3.id,
#   body_delta:
#   "{\"ops\":[{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"I went down to the river,\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"I set down on the bank.\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"I tried to think but couldn't,\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"So I jumped in and sank.\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"I came up once and hollered!\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"I came up twice and cried!\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"If that water hadn't a-been so cold\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"I might've sunk and died.\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"But it was Cold in that water! It was cold!\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"I took the elevator\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"Sixteen floors above the ground.\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"I thought about my baby\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"And thought I would jump down.\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"I stood there and I hollered!\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"I stood there and I cried!\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"If it hadn't a-been so high\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"I might've jumped and died.\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"But it was High up there! It was high!\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"So since I'm still here livin',\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"I guess I will live on.\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"I could've died for love--\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"But for livin' I was born\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"Though you may hear me holler,\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"And you may see me cry--\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"I'll be dogged, sweet baby,\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"If you gonna see me die.\"},{\"attributes\":{\"font\":\"serif\",\"bold\":true,\"color\":\"rgb(  0,   0,   0)\",\"italic\":true},\"insert\":\"\\n\"},{\"attributes\":{\"italic\":true,\"bold\":true,\"font\":\"serif\"},\"insert\":\"Life is fine! Fine as wine! Life is fine!\"},{\"insert\":\"\\n\\nBy Langston Hughes\\n\"}]}",
#   title: "Life is Fine",
#   body:
#   "I went down to the river,\nI set down on the bank.\nI tried to think but couldn't,\nSo I jumped in and sank.\nI came up once and hollered!\nI came up twice and cried!\nIf that water hadn't a-been so cold\nI might've sunk and died.\nBut it was Cold in that water! It was cold!\nI took the elevator\nSixteen floors above the ground.\nI thought about my baby\nAnd thought I would jump down.\nI stood there and I hollered!\nI stood there and I cried!\nIf it hadn't a-been so high\nI might've jumped and died.\nBut it was High up there! It was high!\nSo since I'm still here livin',\nI guess I will live on.\nI could've died for love--\nBut for livin' I was born\nThough you may hear me holler,\nAnd you may see me cry--\nI'll be dogged, sweet baby,\nIf you gonna see me die.\nLife is fine! Fine as wine! Life is fine!\n\nBy Langston Hughes\n">,
# })
