import cssutils
from flask_assets import Bundle, register_filter
from . import app, webassets

css_bundle = Bundle('css/styles.css'
                ,Bundle('../../node_modules/elemental/less/elemental.less', filters='less')
                ,filters='cssutils'
                ,output='styles.css')

webassets.register('css_bundle', css_bundle)
