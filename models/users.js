// Example "users" model
module.exports = {
  '_id': 'uid',
  'username': 'string',
  'email': 'email',
  'password': 'password',
  'active': 'boolean',
  'tags': 'array',
  'posts': 'number',
  'joined': 'timestamp',
  'bio': {
    'fname': 'string',
    'lname': 'string'
  }
};