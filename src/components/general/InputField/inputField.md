## InputField

This is a React functional component that creates a dynamic HTML Input Field. It accepts the
following props in order to fit the desired use case:

# type: string = this prop will define the type of the input field,

# placeholder: string = this prop

# defines the place holder text,

# showPasswordIcon: image = this prop defines the image location for

# use with the password reveal function,

# hidePasswordIcon: image = this prop defines the image location for use with the password reveal function,

# value: any = this props represents the user input,

# label: string = this props defines the label assigned to the input,

# name: string = this props assigns a name property to the input and label,

# id: string = this props assings an Id to the Input element,

# error: string = this props allows a server or api message to be displayed bellow the input component,

# className: string = this props assigns one or several class atributes to the input,

# autoComplete = attribute lets web developers specify if the browser can provide automated assistance in filling out form field values, as well as guidance to the browser as to the type of information expected in the field,

# helpDeskMessage: string = this props allows a server or api message to be displayed bellow the input component,

# autoFocus: boolean = is a Boolean attribute indicating that an element should be focused on page load,

# readOnly: boolean = Boolean readonly attribute, when present, makes the element not mutable, meaning the user can not edit the control,

# requiredField: boolean = indicates that the user must specify a value for the input before the owning form can be submitted,

# disableCopyPaste: boolean = boolean attribute that does not allow the user to paste data into the input,

# showHidePassword: boolean = boolean value which will toggle the input value type from password to text or vice versa,

# disabled: boolean = Boolean disabled attribute, when present, makes the element not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants,

# stripTags: boolean = Handle strip tags from input text,

# otherAttributes = this prop can use for data-attribute, pattern, title and step, otherAttributes={{ minLength: '10', maxLength: '150', min: '1', max:10, step:'1', [data-id]:'demo' }}

# onChange: function = change event will fire when the user modifies the value prop,

# onFocus: function = focus event fires when an element has received focus,

# onBlur: function = onblur event occurs when an HTML element loses focus,

# onKeyDown: function = onkeydown event occurs when the user presses a key on the keyboard,

# onSelect : function = event occurs after some text has been selected in an element. The onselect event is mostly used on <input type="text"> elements,

# onPaste: function = event occurs when the user pastes some content into an element. The onpaste event is mostly used on <input> elements with type="text",
