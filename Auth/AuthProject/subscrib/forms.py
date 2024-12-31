# from django import forms

# def Validator_coma(val):
#     if "," in val:
#         raise forms.ValidationError("Not Valide")
#     return val

# class SubsForm(forms.Form):
#     first_name = forms.CharField(max_length=100, validators=[Validator_coma])
#     last_name = forms.CharField(max_length=100, validators=[Validator_coma])
#     email = forms.EmailField(max_length=100)
#     password = forms.CharField(widget=forms.PasswordInput())

    # def validate_form_name(self):
    #     data = self.cleaned_data['first_name']
    #     if "," in data:
    #         raise forms.ValidationError("Not Valide")
    #     return data
        