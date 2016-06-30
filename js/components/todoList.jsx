/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
var app = app || {};

(function () {
    'use strict';

	var TodoItem = app.TodoItem;
    
    var ESCAPE_KEY = 27;
    var ENTER_KEY = 13;

    app.TodoList = React.createClass({
        getInitialState: function () {
			return {
				editing: null
			};
		},

        toggleAll: function (event) {
			var checked = event.target.checked;
			this.props.model.toggleAll(checked);
		},

		toggle: function (todoToToggle) {
			this.props.model.toggle(todoToToggle);
		},

		destroy: function (todo) {
			this.props.model.destroy(todo);
		},

		edit: function (todo) {
			this.setState({editing: todo.id});
		},

		save: function (todoToSave, text) {
			this.props.model.save(todoToSave, text);
			this.setState({editing: null});
		},

		cancel: function () {
			this.setState({editing: null});
		},

        render: function () {
            var todos = this.props.model.todos;

			var shownTodos = todos.filter(function (todo) {
				switch (this.props.nowShowing) {
				case app.ACTIVE_TODOS:
					return !todo.completed;
				case app.COMPLETED_TODOS:
					return todo.completed;
				default:
					return true;
				}
			}, this);
            
            var todoItems = shownTodos.map(function (todo) {
				return (
					<TodoItem
						key={todo.id}
						todo={todo}
						onToggle={this.toggle.bind(this, todo)}
						onDesrtoy={this.destroy.bind(this, todo)}
						onEdit={this.edit.bind(this, todo)}
						editing={this.state.editing === todo.id}
						onSave={this.save.bind(this, todo)}
						onCancel={this.cancel}
					/>
				);
			}, this);

            return (
                <section className="main">
                    <input
                        className="toggle-all"
                        type="checkbox"
                        onChange={this.toggleAll}
                        checked={this.props.activeTodoCount === 0}
                    />
                    <ul className="todo-list">
                        {todoItems}
                    </ul>
                </section>
            );
        }
    });
})();


