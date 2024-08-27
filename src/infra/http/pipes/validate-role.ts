/* eslint-disable prettier/prettier */
export class ValidateRole {
  constructor(private role: string) {}

  validationRole() {
    if (this.role !== 'admin') {
      throw new Error('Not Autorization!')
    }
  }
}