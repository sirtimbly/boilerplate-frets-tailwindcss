import { PropsWithFields, IFunFrets, IRegisteredField } from "frets/src/index";



export const willMutate = (f: IFunFrets<LoginProps>) => ({
  usernameField: f.registerField("Username", f.modelProps.accountId, {
    notEmpty: {
      value: true,
      message: "Username cannot be empty"
    }
  }),
  passField: f.registerField("Password", "", {
    notEmpty: {
      value: true,
      message: "Password cannot be empty"
    },
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters"
    }
  })
}
