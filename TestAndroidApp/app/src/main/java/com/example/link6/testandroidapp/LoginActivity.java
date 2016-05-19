package com.example.link6.testandroidapp;

import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class LoginActivity extends AppCompatActivity
{
    private final String API_URL = "http://10.0.2.2:3000/login/user_login";
    private String token;
    private Button loginButton;
    private TextView registerLink;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        registerLink = (TextView) findViewById(R.id.registerLinkTextView);
        loginButton = (Button) findViewById(R.id.loginButton);

        registerLink.setOnClickListener(new View.OnClickListener()
        {
            public void onClick(View v)
            {
                Intent intent = new Intent(v.getContext(), RegisterActivity.class);
                startActivity(intent);
            }
        });

        loginButton.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View v)
            {
                String phone = ((EditText) findViewById(R.id.phoneLoginEditView)).getText().toString();
                String password = ((EditText) findViewById(R.id.passwordLoginEditView)).getText().toString();

                Log.v("ERROROROEROEOROEOR", "TROIEOTIEROTIEROIT");

                LoginTask login = new LoginTask();
                login.execute(phone, password);
            }
        });

    }


    public class LoginTask extends AsyncTask<String, Void, String>
    {
        @Override
        protected void onPreExecute()
        {
            super.onPreExecute();

        }

        /**
         * @return POST request result
         * @params[0] Phone number
         * @params[0] Password
         */
        @Override
        protected String doInBackground(String... params)
        {
            String charset = StandardCharsets.UTF_8.name();
            try
            {
                URL url = new URL(API_URL);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();

                String query = String.format("phoneNumber=%s&password=%s",
                        URLEncoder.encode(params[0], charset),
                        URLEncoder.encode(params[1], charset));

                connection.setDoOutput(true);
                connection.setDoInput(true);
                connection.setInstanceFollowRedirects(false);

                Log.v("ERROROROEROEOROEOR", "Toto?");

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


                Log.v("ERROROROEROEOROEOR", "Toto encore ?");

                //Get Response
                InputStream is = connection.getInputStream();
                BufferedReader rd = new BufferedReader(new InputStreamReader(is));
                String line;

                Log.v("ERROROROEROEOROEOR", "Fox FTW");

                BufferedReader in = new BufferedReader(
                        new InputStreamReader(connection.getInputStream()));
                String inputLine;
                StringBuffer response = new StringBuffer();

                Log.v("ERROROROEROEOROEOR", "Tr4sh");

                while ((inputLine = in.readLine()) != null)
                {
                    response.append(inputLine);
                }
                in.close();

                //print result
                Log.v("RESPONSE = ", response.toString());

                return response.toString();

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
            int duration = Toast.LENGTH_SHORT;

            Log.v("RESPONSE IS :", response);

            if (!response.contains("Welcome"))
            {
                Toast toast = Toast.makeText(context, response, duration);
                toast.show();
            }
            else
            {
                User user = new User(((EditText)findViewById(R.id.phoneLoginEditView)).getText().toString(), "");
                Toast toast = Toast.makeText(context, "Welcome " + user.getPhoneNumber(), duration);
                toast.show();
                Intent intent = new Intent(getBaseContext(), RestaurantsListActivity.class);
                intent.putExtra("LoggedUser", user);
                startActivity(intent);
            }
        }
    }

}
