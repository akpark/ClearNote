User.destroy_all

u1 = User.create!({username: "user", password: "password"})
u2 = User.create!({username: "guest", password: "password"})
batman = User.create!({username: "batman", password: "superman"})

Notebook.destroy_all

nb1 = Notebook.create(title: "New Notebook", author_id: u2.id)
nb2 = Notebook.create(title: "Philosophy", author_id: u2.id)
nb3 = Notebook.create(title: "Projects", author_id: u2.id)
nb4 = Notebook.create(title: "Resolutions", author_id: u2.id)

batnb1 = Notebook.create(title: "Personal", author_id: batman.id)
batnb2 = Notebook.create(title: "Errands", author_id: batman.id)

Note.destroy_all

n1 = Note.create!({title: "Welcome", body: "Welcome to Pad. The app to store your thoughts and ideas on a mobile notepad.", author_id: u2.id, notebook_id: 1})
n2 = Note.create!({title: "Philosophy", body: "Awesome Indian restuarant", author_id: u2.id, notebook_id: 1})
n3 = Note.create!({title: "Books", body: "Flowers of Algernon", author_id: u2.id, notebook_id: 1})
n4 = Note.create!({title: "Life lessons", body: "Be humble", author_id: u2.id, notebook_id: 1})

bn6 = Note.create({title: "Goals", body: "Lose 10lbs, Stop eating sugar, Go out more", author_id: batman.id, notebook_id: batnb2.id})
bn5 = Note.create({title: "Todos", body: "Buy more batarangs, Repair batmobile", author_id: batman.id, notebook_id: batnb2.id})
bn3 = Note.create({title: "Hideouts", body: "Batcave", author_id: batman.id, notebook_id: batnb1.id})
bn2 = Note.create({title: "Enemies", body: "Joker, Bane, Penguin, Riddler", author_id: batman.id, notebook_id: batnb1.id})
bn4 = Note.create({title: "My toys", body: "Grappling Gun, Batarang, Explosive Gel, Memory Cloth Cape", author_id: batman.id, notebook_id: batnb1.id})
bn1 = Note.create({title: "Friends", body: "Robin, Alfred", author_id: batman.id, notebook_id: batnb1.id})
