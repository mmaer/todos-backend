import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Todo } from './interfaces/todo.interface';
import { CreateTodoDTO } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) { }

  async addTodo(createTodoDTO: CreateTodoDTO): Promise<Todo> {
    const newTodo = await this.todoModel(createTodoDTO)
    return newTodo.save();
  }

  async editTodo(todoId, createTodoDTO: CreateTodoDTO): Promise<Todo> {
    const editedTodo = await this.todoModel
      .findByIdAndUpdate(todoId, createTodoDTO, { new: true });
    return editedTodo;
  }

  async deleteTodo(todoId): Promise<any> {
    const deletedTodo = await this.todoModel
      .findByIdAndRemove(todoId);
    return deletedTodo;
  }

  async getTodo(todoId): Promise<Todo> {
    const todo = await this.todoModel
      .findById(todoId)
      .exec();
    return todo;
  }

  async getTodos(): Promise<Todo[]> {
    const todos = await this.todoModel.find().exec();
    return todos;
  }
}
