import { Controller, Res, Body, HttpStatus, Post, Get, Param, NotFoundException, Put, Query, Delete } from '@nestjs/common';

import { TodoService } from './todo.service';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('todo')
export class TodoController {

  constructor(private todoService: TodoService) { }

  @Post('/add')
  async addTodo(@Res() res, @Body() createTodoDTO: CreateTodoDTO) {
    const newTodo = await this.todoService.addTodo(createTodoDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Todo has been submitted successfully!',
      todo: newTodo
    });
  }

  @Put('/edit')
  async editTodo(@Res() res, @Query('todoId', new ValidateObjectId()) todoId, @Body() createTodoDTO: CreateTodoDTO) {
    const editedTodo = await this.todoService.editTodo(todoId, createTodoDTO);
    if (!editedTodo) {
      throw new NotFoundException(' Todo does not exist!');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Todo has been successfully upated',
      todo: editedTodo,
    });
  }

  @Delete('/delete')
  async deleteTodo(@Res() res, @Query('todoId', new ValidateObjectId()) todoId) {
    const deletedTodo = await this.todoService.deleteTodo(todoId);
    if (!deletedTodo) {
      throw new NotFoundException(' Todo does not exist!');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Todo has been deleted!',
      todo: deletedTodo,
    });
  }

  @Get('todo/:todoId')
  async getTodo(@Res() res, @Param('todoId', new ValidateObjectId()) todoId) {
    const todo = await this.todoService.getTodo(todoId);
    if (!todo) {
      throw new NotFoundException(' Todo does not exist!');
    }

    return res.status(HttpStatus.OK).json(todo);
  }

  @Get('all')
  async getTodos(@Res() res) {
    const todos = await this.todoService.getTodos();
    return res.status(HttpStatus.OK).json(todos);
  }
}
