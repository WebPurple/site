import { defineSupportCode } from 'cucumber'

defineSupportCode(({ setDefaultTimeout }) => setDefaultTimeout(10 * 1000))
