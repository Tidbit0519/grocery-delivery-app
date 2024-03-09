import * as React from "react"
import { FormControl, useFormControlContext } from "@mui/base/FormControl"
import { Input, inputClasses } from "@mui/base/Input"
import { styled } from "@mui/system"
import clsx from "clsx"

export default function BasicFormControl() {
  return (
    <FormControl
      defaultValue=""
      required
    >
      <Label>Name</Label>
      <StyledInput placeholder="Write your name here" />
      <HelperText />
    </FormControl>
  )
}

const StyledInput = styled(Input)(

)

const Label = styled(({ children, className }) => {
  const formControlContext = useFormControlContext()
  const [dirty, setDirty] = React.useState(false)

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true)
    }
  }, [formControlContext])

  if (formControlContext === undefined) {
    return <p>{children}</p>
  }

  const { error, required, filled } = formControlContext
  const showRequiredError = dirty && required && !filled

  return (
    <p className={clsx(className, error || showRequiredError ? "invalid" : "")}>
      {children}
      {required ? " *" : ""}
    </p>
  )
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`

const HelperText = styled((props) => {
  const formControlContext = useFormControlContext()
  const [dirty, setDirty] = React.useState(false)

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true)
    }
  }, [formControlContext])

  if (formControlContext === undefined) {
    return null
  }

  const { required, filled } = formControlContext
  const showRequiredError = dirty && required && !filled

  return showRequiredError ? <p {...props}>This field is required.</p> : null
})
