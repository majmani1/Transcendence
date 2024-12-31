from django import forms
from .models import chat_mesg

class typing(forms.ModelForm):
    class Meta:
        model = chat_mesg
        fields = ['message', 'sender']
    
# message = forms.CharField(max_length=300)