web: gunicorn npsTrip.wsgi --chdir backend --limit-request-line 8188 --log-file -
worker: celery worker --workdir backend --app=npsTrip -B --loglevel=info
