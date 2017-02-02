package com.malikov.shopsystem.to;

public class LastNameAutocompleteTo {

    private String label;

    private String value;

    private String phoneNumber;

    public LastNameAutocompleteTo(String label, String value, String phoneNumber) {
        this.label = label;
        this.value = value;
        this.phoneNumber = phoneNumber;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
