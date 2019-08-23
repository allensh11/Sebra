FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
#RUN pip install --no-cache-dir pylibra

COPY . .

#RUN cd /usr/src/app/
#RUN echo $(ls)

CMD [ "python3", "./run.py" ]