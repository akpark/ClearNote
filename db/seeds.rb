User.destroy_all

u1 = User.create!({username: "user", password: "password"})
u2 = User.create!({username: "guest", password: "password"})

Notebook.destroy_all

nb1 = Notebook.create(title: "New Notebook", author_id: u2.id)
nb1 = Notebook.create(title: "Philosophy", author_id: u2.id)
# nb2 = Notebook.create(title: "Projects", author_id: u2.id)
nb3 = Notebook.create(title: "Resolutions", author_id: u2.id)

Note.destroy_all

n1 = Note.create!({title: "Welcome", body: "Welcome to Pad. The app to store your thoughts and ideas on a mobile notepad.", author_id: u2.id, notebook_id: 1})
n2 = Note.create!({title: "Philosophy", body: "Awesome Indian restuarant", author_id: u2.id, notebook_id: 1})
n3 = Note.create!({title: "Books", body: "Flowers of Algernon", author_id: u2.id, notebook_id: 1})
n4 = Note.create!({title: "Life lessons", body: "Be humble", author_id: u2.id, notebook_id: 1})
