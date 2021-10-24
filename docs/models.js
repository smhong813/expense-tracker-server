/**
 * @swagger
 * definitions:
 *   Expense:
 *     type: object
 *     description: Used for response
 *     properties:
 *       _id:
 *         type: string
 *         description: The auto-generated unique ID
 *       description:
 *         type: string
 *         description: The content of the expense
 *       amount:
 *         type: integer
 *         description: The amount of the expense
 *       date:
 *         type: string
 *         description: The date of the expense
 *       createdAt:
 *         type: string
 *         description: The date inserted into the DB
 *
 *   PlainExpense:
 *     type: object
 *     description: Used for request (it doesn't have _id and createdAt properties)
 *     properties:
 *       description:
 *         type: string
 *         description: The content of the expense
 *       amount:
 *         type: integer
 *         description: The amount of the expense
 *       date:
 *         type: string
 *         description: The date of the expense
 *
 *   Error:
 *     type: object
 *     properties:
 *       error:
 *         type: object
 *         description: An object contains error information
 *         properties:
 *           status:
 *             type: integer
 *             description: A error code (optional)
 *           message:
 *             type: string
 *             description: A message for users
 */
