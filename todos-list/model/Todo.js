export default class Todo {
    constructor(id, userId, title, completed, important, later, isCurrentlyEdited, newTitle) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.completed = completed;
        this.important = important;
        this.later = later;
        this.isCurrentlyEdited = isCurrentlyEdited;
        this.newTitle = newTitle;
    }
};  