from flask import Flask, render_template, request, make_response
from xhtml2pdf import pisa
from io import BytesIO

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        data = {
            'full_name': request.form['full_name'],
            'email': request.form['email'],
            'academic_status': request.form['academic_status'],
            'skill_set': request.form['skill_set'],
            'about': request.form['about'],
        }
        html = render_template('result.html', data=data)
        pdf = BytesIO()
        pisa.CreatePDF(html, dest=pdf)
        pdf.seek(0)
        resp = make_response(pdf.read())
        resp.headers['Content-Type'] = 'application/pdf'
        resp.headers['Content-Disposition'] = 'attachment; filename="user_data.pdf"'
        return resp
    return render_template('form.html')

if __name__ == '__main__':
    app.run(debug=True)