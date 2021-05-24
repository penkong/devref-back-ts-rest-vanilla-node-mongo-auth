import { IncomingMessage, ServerResponse } from 'http'

import { getBody } from '../../util'
import { BadReqErr } from '../../error/'
import { IRegisterInfo } from '../../@types'
// import { UserRepository } from '../../data/'
import { PasswordService } from '../../service/Password.service'

export const forgotPassword = async (
  _url: URL,
  req: IncomingMessage,
  res: ServerResponse
) => {
  try {
    const { email } = (await getBody(req)) as Partial<IRegisterInfo>

    if (!email) throw new BadReqErr('Wrong Inputs!')

    // const user = await UserRepository.getByEmail(email)

    // if (!user) throw new BadReqErr('Go Register!')

    const resetToken = await PasswordService.resetToken()

    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(resetToken))
    res.end()

    return
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify([{ message: error.message }]))
    res.end()

    return
  }
}

// // @desc    Forgot Password Initialization
// export const forgotPassword = async (req, res, next) => {
//   // Send Email to email provided but first check if user exists
//   const { email } = req.body
//   try {
//     const user = await User.findOne({ email })

//     if (!user) {
//       return next(new ErrorResponse('No email could not be sent', 404))
//     }

//     // Reset Token Gen and add to database hashed (private) version of token
//     const resetToken = user.getResetPasswordToken()

//     await user.save()

//     // Create reset url to email to provided email
//     const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`

//     // HTML Message
//     const message = `
//       <h1>You have requested a password reset</h1>
//       <p>Please make a put request to the following link:</p>
//       <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
//     `

//     try {
//       await sendEmail({
//         to: user.email,
//         subject: 'Password Reset Request',
//         text: message
//       })

//       res.status(200).json({ success: true, data: 'Email Sent' })
//     } catch (err) {
//       console.log(err)

//       user.resetPasswordToken = undefined
//       user.resetPasswordExpire = undefined

//       await user.save()

//       return next(new ErrorResponse('Email could not be sent', 500))
//     }
//   } catch (err) {
//     next(err)
//   }
// }

// exports.forgotPassword = catchAsync(async (req, res, next) => {
//   // 1) Get user based on POSTed email
//   const user = await User.findOne({ email: req.body.email })
//   if (!user) {
//     return next(new AppError('There is no user with email address.', 404))
//   }

//   // 2) Generate the random reset token
//   const resetToken = user.createPasswordResetToken()
//   await user.save({ validateBeforeSave: false })

//   // 3) Send it to user's email
//   try {
//     const resetURL = `${req.protocol}://${req.get(
//       'host'
//     )}/api/v1/users/resetPassword/${resetToken}`
//     await new Email(user, resetURL).sendPasswordReset()

//     res.status(200).json({
//       status: 'success',
//       message: 'Token sent to email!'
//     })
//   } catch (err) {
//     user.passwordResetToken = undefined
//     user.passwordResetExpires = undefined
//     await user.save({ validateBeforeSave: false })

//     return next(
//       new AppError('There was an error sending the email. Try again later!'),
//       500
//     )
//   }
// })
