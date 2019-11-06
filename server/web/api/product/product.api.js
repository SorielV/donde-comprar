import { Router } from 'express'
import Controller from './product.controller'
import { errorHandle, queryOptions } from '../../middlware'

const router = Router()

const defaultPagination = {
  allowPagination: true,
  defaultPagination: [1, 50],
  allowOrder: true,
  orderPropsAllowed: ['id', 'slug', 'name', 'category', 'shop', 'brand'],
  allowFilter: true,
  filterPropsAllowed: ['id', 'slug', 'name', 'category', 'shop', 'brand'],
  strictFilter: true
}

export default router
  .get('/', queryOptions(defaultPagination), errorHandle(Controller.getProducts))
