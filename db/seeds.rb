User.destroy_all

u1 = User.create!({username: "user", password: "password"})
u2 = User.create!({username: "guest", password: "password"})

Note.destroy_all

n1 = Note.create!({title: "App Academy", body: "Coding bootcamp", author_id: u2.id, notebook_id: 1})
n2 = Note.create!({title: "Lehor", body: "Awesome Indian restuarant", author_id: u2.id, notebook_id: 1})
n3 = Note.create!({title: "Books", body: "Flowers of Algernon", author_id: u2.id, notebook_id: 1})
n4 = Note.create!({title: "Life lessons", body: "Be humble", author_id: u2.id, notebook_id: 1})
