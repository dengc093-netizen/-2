"""
WSGI config for petpals project.
"""
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'petpals.settings')
application = get_wsgi_application()
