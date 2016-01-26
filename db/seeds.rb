User.destroy_all

u1 = User.create!({username: "user1", password: "password"})

Note.destroy_all

n1 = Note.create!({title: "App Academy", body: "Testing testing 1, 2, 3", author_id: u1.id, notebook_id: 1})
n2 = Note.create!({title: "App Academy", body: "Testing testing 1, 2, 3", author_id: u1.id, notebook_id: 1})
n3 = Note.create!({title: "App Academy", body: "Testing testing 1, 2, 3", author_id: u1.id, notebook_id: 1})
n4 = Note.create!({title: "App Academy", body: "Testing testing 1, 2, 3", author_id: u1.id, notebook_id: 1})
