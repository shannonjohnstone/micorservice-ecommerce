const { validateSchemaValues, throwValidationException } = require('../../helpers/validation/schema-validation')

const productSchema = {
  category: 'string!',
  name: 'string!',
  description: 'string!',
  price: 'string!',
}

const productsModel = (args, products) => {
  products.category = args.category
  products.name = args.name
  products.description = args.description
  products.price = args.price

  return products
}

module.exports.productPlugin = function(options) {
  const seneca = this

  const area = 'product'
  const ACTIONS = {
    FETCH: 'fetch',
    ADD: 'add'
  }
  const DB_COLLECTION_PRODUCTS = 'products'

  /**
  * Test Get
  */
  seneca.add({ area, action: 'barzinga' }, function(args, done) {
    done(null, {
      bar: 'Barzinga'
    })
  })

  /**
  * Fetch the list of all products
  */
  seneca.add({ area, action: ACTIONS.FETCH }, function (args, done) {
    const products = this.make(DB_COLLECTION_PRODUCTS)
    products.list$({}, done)
  })

  /**
  * Fetch the list of products by category
  */
  seneca.add({ area, action: ACTIONS.FETCH, criteria: 'byCategory' }, function(args, done) {
    const products = this.make(DB_COLLECTION_PRODUCTS)
    products.list$({ category: args.category }, done)
  })

  /**
  * Fetch product by id
  */
  seneca.add({ area, action: ACTIONS.FETCH, criteria: 'byId' }, function(args, done) {
    const product = this.make(DB_COLLECTION_PRODUCTS)
    product.load$(args.id, done)
  })

  /**
  * Add product
  */
  seneca.add({ area, action: ACTIONS.ADD }, function(args, done) {
    const products = this.make(DB_COLLECTION_PRODUCTS)
    try {
      validateSchemaValues(productSchema, args, 'The follow values are required for products: category, name, description, price')
      productsModel(args, products).save$((err, product) => done(err, products.data$(false)))
    } catch (err) {
      console.log(err, 'error');
      return done(null, err)
      // throwValidationException(`The follow values are required for products: category, name, description, price`)
    }
  })

  /**
  * Removes a product by idea
  */
  seneca.add({ area: 'product', action: 'remove' }, function(args, done) {
    const product = this.make('products')
    product.remove$(args.id, function(err) {
      done(err, null)
    })
  })

  /**
  * Edit a product fetching it by id
  */
  seneca.add({ area: 'product', action: 'edit' }, function(args, done) {
    seneca.act({ area: 'product', action: 'fetch', critera: 'byId', id: args.id }, function(err, result) {
      result.data$({
        name: args.name,
        category: args.category,
        description: args.description,
        price: args.price
      })
      result.save$(function(err, product) {
        done(err, product.data$(false))
      })
    })
  })
}
