package com.example.link6.testandroidapp;

import android.content.Context;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class RegisterActivity extends AppCompatActivity
{
    private final String API_URL = "http://10.0.2.2:3000/register/user_register/";
    private Button registerButton;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        registerButton = (Button) findViewById(R.id.registerButton);

        registerButton.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View v)
            {
                String phone = ((EditText) findViewById(R.id.phoneRegisterEditView)).getText().toString();
                String password = ((EditText) findViewById(R.id.passwordRegisterEditView)).getText().toString();
                String repassword = ((EditText) findViewById(R.id.repasswordRegisterEditView)).getText().toString();
                RegisterTask register = new RegisterTask();
                register.execute(phone, password, repassword);
            }
        });
    }


    public class RegisterTask extends AsyncTask<String, Void, String>
    {
        @Override
        protected void onPreExecute()
        {
            registerButton.setClickable(false);
        }

        /**
         * @return String
         * @params[0] Phone number
         * @params[1] Password
         * @params[2] Password confirmation
         */
        @Override
        protected String doInBackground(String... params)
        {
            String charset = StandardCharsets.UTF_8.name();
            try
            {
                URL url = new URL(API_URL);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();

                String query = String.format("phoneNumber=%s&password=%s&re_password=%s",
                        URLEncoder.encode(params[0], charset),
                        URLEncoder.encode(params[1], charset),
                        URLEncoder.encode(params[2], charset));


                connection.setDoOutput(true);
                connection.setDoInput(true);
                connection.setInstanceFollowRedirects(false);

                connection.setRequestMethod("POST");
                connection.setRequestProperty("Content-Type",
                        "application/x-www-form-urlencoded");

                connection.setRequestProperty("Content-Length", "" +
                        Integer.toString(query.getBytes().length));
                connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
                connection.setRequestProperty("Accept-Charset", charset);
                connection.setUseCaches(false);

                //Send request
                DataOutputStream wr = new DataOutputStream(
                        connection.getOutputStream());
                wr.writeBytes(query);
                wr.flush();
                wr.close();

                //Get Response
                InputStream is = connection.getInputStream();
                BufferedReader rd = new BufferedReader(new InputStreamReader(is));
                String line;

                BufferedReader in = new BufferedReader(
                        new InputStreamReader(connection.getInputStream()));
                String inputLine;
                StringBuffer response = new StringBuffer();

                while ((inputLine = in.readLine()) != null)
                {
                    response.append(inputLine);
                }
                in.close();

                //print result
                Log.v("RESPONSE = ", response.toString());
                return (response.toString());

            } catch (Exception e)
            {
                Log.e("/!\\ ERROR /!\\", e.getMessage(), e);
            }
            return null;
        }

        @Override
        protected void onPostExecute(String response)
        {
            Context context = getApplicationContext();
            String message = "Phone number already used, please try again";
            int duration = Toast.LENGTH_SHORT;

            registerButton.setClickable(true);
            Log.v("THE RESPONSE IS ", ">" + response + "<");
            if (!response.equals("Please try another phone number, this number has already register, you can log in"))
            {
                message = "Register successful, you can login";
                Toast toast = Toast.makeText(context, message, duration);
                toast.show();

                finish();
            } else
            {
                Toast toast = Toast.makeText(context, message, duration);
                toast.show();
            }

        }
    }
}
