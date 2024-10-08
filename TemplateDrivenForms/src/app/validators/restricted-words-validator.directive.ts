import { Directive, Input } from '@angular/core'
import {
    NG_VALIDATORS,
    AbstractControl,
    ValidationErrors,
    Validator,
} from '@angular/forms'

@Directive({
    selector: '[restrictedWords]',
    standalone: true,
    providers: [
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: RestrictedWordsValidator,
        },
    ],
})
export class RestrictedWordsValidator implements Validator {
    @Input() restrictedWords: string[] = []
    validate(control: AbstractControl): null | ValidationErrors {
        if (!control.value) return null

        // list of invalidate words.
        const invalidwords = this.restrictedWords.map((w) =>
            control.value.includes(w) ? w : null
        ).filter(w => w !== null);

        // here we actually set as the return of this validatior the list of invalid words joined by a comma 
        return invalidwords.length > 0 ? { restrictedWords: invalidwords.join(',') } : null
    }
}
