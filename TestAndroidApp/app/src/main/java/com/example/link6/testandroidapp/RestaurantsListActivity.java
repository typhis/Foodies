package com.example.link6.testandroidapp;

import android.content.Context;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.NavigationView;
import android.support.design.widget.Snackbar;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.ArrayList;

public class RestaurantsListActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener, LocationListener
{

    /**
     * Properties
     */

    LocationManager locationManager;
    String mprovider = "";

    ArrayAdapter<String> restaurantListAdapter;
    // public ArrayList<HashMap<String, String>> restolist = new ArrayList<HashMap<String, String>>();


    /**
     * Methods
     */

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_restaurants_list);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);


        /**
         * Retrieve User from Loginactivity
         */
        User user = (User) getIntent().getSerializableExtra("LoggedUser");
        Log.v("USER PHONE = ", user.getPhoneNumber());

        ArrayList<String> restoArray = new ArrayList<>();
        restaurantListAdapter = new ArrayAdapter<String>(this, R.layout.restaurant_info_cell, R.id.restoInfos, restoArray);

        ListView listView = (ListView) findViewById(R.id.restaurantListView);
        listView.setAdapter(restaurantListAdapter);

        locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        Criteria criteria = new Criteria();
        mprovider = locationManager.getBestProvider(criteria, false);

        RetrieveRestaurantsTask getRestaurants = new RetrieveRestaurantsTask(restaurantListAdapter, null);
        getRestaurants.execute();

//        if (mprovider != null && !mprovider.equals(""))
//        {
//            if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED &&
//                    ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED)
//            {
//                return;
//            }
//            Location location = locationManager.getLastKnownLocation(mprovider);
//            locationManager.requestLocationUpdates(mprovider, 15000, 1, this);
//
//            Log.v("LOCATION: ", location.toString());
//
//            if (location != null)
//            {
//                RetrieveRestaurantsTask getRestaurants = new RetrieveRestaurantsTask(restaurantListAdapter, location);
//                getRestaurants.execute();
//            }
//            else
//                Toast.makeText(getBaseContext(), "No Location Provider Found Check Your Code", Toast.LENGTH_SHORT).show();
//        }
    }

    @Override
    public void onLocationChanged(Location location)
    {
//        TextView longitude = (TextView) findViewById(R.id.textView);
//        TextView latitude = (TextView) findViewById(R.id.textView1);
//
//        longitude.setText("Current Longitude:" + location.getLongitude());
//        latitude.setText("Current Latitude:" + location.getLatitude());
    }

    @Override
    public void onStatusChanged(String s, int i, Bundle bundle)
    {

    }

    @Override
    public void onProviderEnabled(String s)
    {

    }

    @Override
    public void onProviderDisabled(String s)
    {

    }

//    public Location getCurrentLocation()
//    {
//        String provider;
//        /**
//         * Prompt for enable GPS
//         */
//        LocationManager service = (LocationManager) getSystemService(LOCATION_SERVICE);
//        boolean enabled = service
//                .isProviderEnabled(LocationManager.GPS_PROVIDER);
//        if (!enabled)
//        {
//            Intent intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
//            startActivity(intent);
//        }
//
//        Criteria criteria = new Criteria();
//
//        provider = service.getBestProvider(criteria, true);
//
//        if (provider == null || provider.equals("")) {
//            startActivity(new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS));
//        }
//
//        if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED &&
//                ContextCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED)
//        {
//            return null;
//        }
//        else
//        {
//            Location location = service.getLastKnownLocation(provider);
//            return location;
//        }
//
//    }

    @Override
    public void onBackPressed()
    {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START))
        {
            drawer.closeDrawer(GravityCompat.START);
        } else
        {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu)
    {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.restaurants_list, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item)
    {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings)
        {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item)
    {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_camera)
        {
            // Handle the camera action
        } else if (id == R.id.nav_gallery)
        {

        } else if (id == R.id.nav_slideshow)
        {

        } else if (id == R.id.nav_manage)
        {

        } else if (id == R.id.nav_share)
        {

        } else if (id == R.id.nav_send)
        {

        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }
}
