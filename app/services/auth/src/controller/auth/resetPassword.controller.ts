// // @desc    Reset User Password
// export const resetPassword = async (req, res, next) => {
//   // Compare token in URL params to hashed token
//   const resetPasswordToken = crypto
//     .createHash('sha256')
//     .update(req.params.resetToken)
//     .digest('hex')

import { IncomingMessage, ServerResponse } from 'http'

//   try {
//     const user = await User.findOne({
//       resetPasswordToken,
//       resetPasswordExpire: { $gt: Date.now() }
//     })

//     if (!user) {
//       return next(new ErrorResponse('Invalid Token', 400))
//     }

//     user.password = req.body.password
//     user.resetPasswordToken = undefined
//     user.resetPasswordExpire = undefined

//     await user.save()

//     res.status(201).json({
//       success: true,
//       data: 'Password Updated Success',
//       token: user.getSignedJwtToken()
//     })
//   } catch (err) {
//     next(err)
//   }
// }

export const resetPassword = async (
  _url: URL,
  _req: IncomingMessage,
  _res: ServerResponse
) => {}
