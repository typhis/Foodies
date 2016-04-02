package com.example.zirakai.foodies;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;

public class MainActivity extends AppCompatActivity {
    EditText PhoneNumber, Password;
    Button Login, Register;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Get the value of NumberRestaurant
        PhoneNumber = (EditText) findViewById(R.id.PhoneNumber);
        Password = (EditText) findViewById(R.id.Password);
        Login = (Button) findViewById(R.id.Login);
        Register = (Button) findViewById(R.id.Register);

        // When click on Login Button
        Login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!PhoneNumber.getText().toString().isEmpty()) {
                    try {
                        String param = "phoneNumber=" + URLEncoder.encode(PhoneNumber.getText().toString(), "UTF-8") +
                                "&Password=" + URLEncoder.encode(Password.getText().toString(), "UTF-8");
                        LoginAction la = new LoginAction();
                        la.doInBackground(param);
                    } catch(IOException ex){
                        Toast.makeText(getApplicationContext(), ex.toString(), Toast.LENGTH_SHORT).show();
                    }
                    //LoginAction(PhoneNumber.getText().toString(), Password.getText().toString());
                } else {
                    Toast.makeText(getApplicationContext(), "Enter your Restaurant Number", Toast.LENGTH_SHORT).show();
                }
            }
        });

        // When click on Register Button
        Register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent in =  new Intent(MainActivity.this, RegisterActivity.class);
                in.putExtra("PhoneNumber",PhoneNumber.getText().toString());
                in.putExtra("Password",Password.getText().toString());
                startActivity(in);
            }
        });
    }

    private class LoginAction extends AsyncTask<String, Void, String> {

        @Override
        protected String doInBackground(String... params) {
            InputStream is = null;
            int len = 500;

            try{
                URL url = new URL("http://eternight:romrom01@jello.modulusmongo.net:27017/login/user_login");

                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setReadTimeout(10000);
                conn.setConnectTimeout(15000);
                conn.setRequestMethod("POST");
                conn.setDoOutput(true);
                conn.setRequestProperty("Content-Type",
                        "application/x-www-form-urlencoded");

                PrintWriter out = new PrintWriter(conn.getOutputStream());
                out.print(params);
                out.close();

            }catch(MalformedURLException ex){
                Toast.makeText(getApplicationContext(), ex.toString(), Toast.LENGTH_SHORT).show();
            }catch(IOException ex){
                Toast.makeText(getApplicationContext(), ex.toString(), Toast.LENGTH_SHORT).show();
            } finally {
                //if (is != null) {
                //    is.close();
            }
            return null;
        }
    }
}