package com.example.link6.testandroidapp;

import java.io.Serializable;

/**
 * Created by link6 on 08/05/2016.
 */
public class User implements Serializable
{
    public String getPhoneNumber()
    {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber)
    {
        this.phoneNumber = phoneNumber;
    }
    private String phoneNumber;

    public String getToken()
    {
        return token;
    }
    public void setToken(String token)
    {
        this.token = token;
    }
    private String token;

    public User(String _phoneNumber, String _token)
    {
        phoneNumber = _phoneNumber;
        token = _token;
    }
}
