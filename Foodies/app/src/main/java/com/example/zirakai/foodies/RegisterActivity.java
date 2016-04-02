package com.example.zirakai.foodies;

import android.app.Activity;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by zirakai on 16-4-1.
 */
public class RegisterActivity extends Activity {
    EditText PhoneNumber, Password, Password2;
    Button Register;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        PhoneNumber = (EditText) findViewById(R.id.PhoneNumber);
        Password = (EditText) findViewById(R.id.Password);
        Password2 = (EditText) findViewById(R.id.Password2);
        Register = (Button) findViewById(R.id.Register);

        // Put the data from the Main View
        Intent in = getIntent();
        PhoneNumber.setText(in.getStringExtra("PhoneNumber"));
        Password.setText(in.getStringExtra("Password"));

        // When click on Register Button
        Register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // TODO
            }
        });

    }

    private class RegisterAction extends AsyncTask<String, Void, String> {

        @Override
        protected String doInBackground(String... params) {
            try {
                URL url = new URL("http://eternight:romrom01@jello.modulusmongo.net:27017/register/user_register");

                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setReadTimeout(10000);
                conn.setConnectTimeout(15000);
                conn.setRequestMethod("POST");
                conn.setDoOutput(true);

                // start the query
                conn.connect();

            } catch (IOException e) {

            }
            return null;
        }

        @Override
        protected void onPreExecute() {}

        @Override
        protected void onProgressUpdate(Void... values) {}

        @Override
        protected void onPostExecute(String result) {
            // result is what you got from your connection
            //aTextView.setText(result);

        }
    }
}
