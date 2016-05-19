package com.example.link6.testandroidapp;

import android.location.Location;
import android.os.AsyncTask;
import android.util.Log;
import android.widget.ArrayAdapter;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by Jean FAURE on 04/05/2016.
 */

public class RetrieveRestaurantsTask extends AsyncTask<Void, Void, JSONArray>
{

    private static final String RESTO_INFOS = "information";
    private static final String RESTO_COOR = "location";
    private static final String RESTO_NAME = "name";

    private static final String API_URL = "http://10.0.2.2:3000/manage/get_all_restaurant/";
    ArrayAdapter<String> restaurantAdapter;
    Location currentLocation;

    public RetrieveRestaurantsTask(ArrayAdapter<String> _restaurantAdapter, Location _curentLocation)
    {
        this.restaurantAdapter = _restaurantAdapter;
        this.currentLocation = _curentLocation;
    }

    protected String getDistanceInMeters(String location)
    {
        String[] coor = location.split(",");
        Location dest = new Location("");
        dest.setLatitude(Double.parseDouble(coor[0]));
        dest.setLongitude(Double.parseDouble(coor[1]));

        if (currentLocation == null)
        Log.v("COUCOU", "ALLO C DOGE");


        float distance = currentLocation.distanceTo(dest);


        return Float.toString(distance);
    }

    @Override
    protected void onPreExecute()
    {
    }

    @Override
    protected JSONArray doInBackground(Void... params)
    {
        JSONParser jparser = new JSONParser();
        JSONArray jobj = jparser.getJSONFromUrl(API_URL);

        return jobj;
//        String charset = StandardCharsets.UTF_8.name();
//        BufferedReader reader = null;
//        HttpURLConnection connection = null;
//        try
//        {
//            URL url = new URL(API_URL);
//            connection = (HttpURLConnection) url.openConnection();
//
//            connection.setRequestMethod("GET");
//            connection.connect();
//
//            InputStream inputStream = connection.getInputStream();
//            StringBuffer buffer = new StringBuffer();
//            if (inputStream == null)
//            {
//                return null;
//            }
//
//            reader = new BufferedReader(new InputStreamReader(inputStream));
//
//            String line;
//
//            while ((line = reader.readLine()) != null)
//            {
//                buffer.append(line + "\n");
//            }
//
//            if (buffer.length() == 0)
//            {
//                return null;
//            }
//
//            return buffer.toString();
//
//        } catch (Exception e)
//        {
//            Log.e("ERROR", e.getMessage(), e);
//            return (null);
//        } finally
//        {
//            if (connection != null)
//                connection.disconnect();
//            if (reader != null)
//            {
//                try
//                {
//                    reader.close();
//                } catch (final IOException e)
//                {
//                    Log.e("ERROR", e.getMessage(), e);
//                }
//            }
    }

    @Override
    protected void onPostExecute(JSONArray restaurantList)
    {
        try
        {
            restaurantAdapter.clear();
            for (int i = 0; i < restaurantList.length(); i++)
            {
                String name;
                String location;

                JSONObject resto = restaurantList.getJSONObject(i);
                Log.v("RESTO JSON : ", resto.toString());
                if (resto.has(RESTO_INFOS))
                {
                    JSONObject info_resto = resto.getJSONObject(RESTO_INFOS);


                    // Store Restaurant infos in a String
                    name = info_resto.getString(RESTO_NAME);
                    location = info_resto.getString(RESTO_COOR);
                    // location = getDistanceInMeters(info_resto.getString(RESTO_COOR));

                    restaurantAdapter.add(name + " - " + location);
                }
            }
        } catch (JSONException e)
        {
            Log.e("JSON Error", "Error parsing datas " + e.toString());
        }

        // Log.v("RESTAURANT LIST = ", restaurantList);
        // restaurantListAdapter.clear();
//        for (String restaurantStr: restaurantList)
//        {
//            restaurantListAdapter.add(restaurantList);
//        }
    }
}
