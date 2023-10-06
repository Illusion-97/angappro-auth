import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

// Reçois en paramètre un FormControl dont la valeur doit être égale à celle du FormControl auquel est appliqué ce validateur
export function MustMatch(matchingControl: AbstractControl): ValidatorFn {
  // L'Abstract control ci-dessous correspond au FormControl du formulaire auquel on veut appliquer le validateur
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value !== matchingControl.value ? {MustMatch: {value: control.value}} : null
  }
}
