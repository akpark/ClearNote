# ClearNote

[Heroku link][heroku]

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

ClearNote is a web application inspired by Evernote built using Ruby on Rails
and React.js. ClearNote allows users to:

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create, read, edit, and delete notes
- [ ] Organize notes within Notebooks
- [ ] Tag notes with multiple tags and search notes by tag
- [ ] Search through notes for blocks of text
- [ ] Apply complex styling to notes while editing
- [ ] Set reminders on notes

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Note Model and JSON API (1 day)

In Phase 1, I will begin by implementing user signup and authentication (using
BCrypt). There will be a basic landing page after signup that will contain the
container for the application's root React component. Before building out the
front end, I will begin by setting up a full JSON API for Notes.

[Details][phase-one]

### Phase 2: Flux Architecture and Note CRUD (2 days)

Phase 2 is focused on setting up Flux, the React Router, and the React view
structure for the main application. After the basic Flux architecture has been
set up, a Note store will be implemented and a set of actions corresponding to
the needed CRUD functionality created. Once this is done, I will create React
views for the Notes `Index`, `IndexItem` and `Form`. At the end of Phase 2,
Notes can be created, read, edited, and destroyed in the browser. When
destroyed, notes should be sent to the trash folder where it is dealt with
until further notice by user or capacity. Notes should save to the database
when the form loses focus or is left idle after editing.

[Details][phase-two]

### Phase 3: Notebooks and Tags (2 days)

Phase 3 adds organization to the Notes. Notes belong to a Notebook, which has
its own `Index` view. Create JSON API for Notebooks. Notes can also be included
in shortcuts. Create a shortcut `Index` component. Notes can also now be
tagged with multiple tags. Users can bring up notes in a separate `SearchIndex`
view by searching for their tags. Once the tag search is implemented, I will
extend this to a fuzzy search through every Note's content.

[Details][phase-three]

### Phase 4: Allow Complex Styling in Notes (1 day)

Using the react-quill library (based on Quill.js), allow for complex styling of
notes as well as adding in different forms of media.

[Details][phase-four]

### Phase 5: Reminders and Shortcuts (1 day)

Phase 5 introduces two new features. First, users can set reminders on notes
which will at the time they are set for prompt the user to review and edit the
given note. Users can also give notes the options of being a shortcut. In doing
so, a shortcut index on the sidebar will show the notes that are shortcuts.

[Details][phase-five]

### Phase 6: Styling Cleanup and Seeding (2 days)

I will add styling to make the app resemble Evernote. I will first polish the
last touches that are important to the core of the application. Then, I will add
sleek transitions from one component to the other. I will add sharing
functionality, a calendar button on the sidebar to organize notes by date.
If enough time, I will implement a work chat system.


### Bonus Features (TBD)
- [ ] Style in images and audio
- [ ] Create stacks of notebooks
- [ ] Apply location of where note was taken
- [ ] Calendar organization
- [ ] Work Chat
- [ ] Prettify transitions
- [ ] Use javascript library for cleaner tag selection
- [ ] Changelogs for Notes
- [ ] Pagination / infinite scroll for Notes Index
- [ ] Multiple sessions

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
