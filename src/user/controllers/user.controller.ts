import { Request, Response } from "express";
import UserService from '../services/user.service';

/**
 * api functions
 */

/**
 * get user function, returns the target user associated with the request
 * 
 * @param {Request} request the express request object
 * @param {Response} response the express response object
 */
const getUser = async (request: Request, response: Response) => {
  const test = await UserService.getUser();
  response.send(test);
}

/**
 * page render functions
 */

/**
 * get test function, renders the test page for the application
 * 
 * @param {Request} request the express request object
 * @param {Response} response the express response object
 */
const getTest = async (request: Request, response: Response) => {
  response.render('user/test', { title: 'Main page' });    
}

export default {
  getUser,
  getTest
}