package com.example.link6.testandroidapp;

import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

/**
 * Created by Jean FAURE on 18/05/2016.
 */
public class JSONParser
{
    public JSONParser()
    {

    }

    public JSONArray getJSONFromUrl(String stringUrl)
    {
        String result = "";
        JSONArray jsonResult = null;
        String charset = StandardCharsets.UTF_8.name();
        BufferedReader reader = null;
        HttpURLConnection connection = null;

        try
        {
            URL url = new URL(stringUrl);
            connection = (HttpURLConnection) url.openConnection();

            connection.setRequestMethod("GET");
            connection.connect();

            InputStream inputStream = connection.getInputStream();
            StringBuffer buffer = new StringBuffer();
            if (inputStream == null)
            {
                return null;
            }

            reader = new BufferedReader(new InputStreamReader(inputStream), 8);

            String line = null;

            while ((line = reader.readLine()) != null)
            {
                buffer.append(line + "\n");
            }

            if (buffer.length() == 0)
            {
                return null;
            }

            inputStream.close();
            result = buffer.toString();

        } catch (Exception e)
        {
            Log.e("ERROR", e.getMessage(), e);
            return (null);
        } finally
        {
            if (connection != null)
                connection.disconnect();
            if (reader != null)
            {
                try
                {
                    reader.close();
                } catch (final IOException e)
                {
                    Log.e("ERROR", e.getMessage(), e);
                }
            }
        }

        try
        {
            jsonResult = new JSONArray(result);
        } catch (JSONException e)
        {
            Log.e("JSON Parser", "Error parsing data " + e.toString());
        }

        return jsonResult;
    }
}
