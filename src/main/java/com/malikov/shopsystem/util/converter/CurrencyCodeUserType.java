package com.malikov.shopsystem.util.converter;

import com.malikov.shopsystem.enumtype.CurrencyCode;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.usertype.UserType;

import java.io.Serializable;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;

/**
 * @author Yurii Malikov
 */
public class CurrencyCodeUserType implements UserType {

    private static final int[] SQL_TYPES = {Types.VARCHAR};

    public int[] sqlTypes() {
        return SQL_TYPES;
    }

    public Class returnedClass() {
        return CurrencyCode.class;
    }

    @Override
    public Object nullSafeGet(ResultSet rs, String[] names, SharedSessionContractImplementor session,
                              Object owner) throws HibernateException, SQLException {
        String code = rs.getString(names[0]);
        CurrencyCode result = null;
        if (!rs.wasNull()) {
            result = CurrencyCode.forCurrencyCode(code);
        }
        return result;
    }

    @Override
    public void nullSafeSet(PreparedStatement st, Object value, int index,
                            SharedSessionContractImplementor session) throws HibernateException, SQLException {
        if (null == value) {
            st.setNull(index, Types.VARCHAR);
        } else {
            st.setString(index, ((CurrencyCode) value).code());
        }

    }

    public Object deepCopy(Object value) throws HibernateException {
        return value;
    }

    public boolean isMutable() {
        return false;
    }

    public Object assemble(Serializable cached, Object owner) throws HibernateException {
        return cached;
    }

    public Serializable disassemble(Object value) throws HibernateException {
        return (Serializable) value;
    }

    public Object replace(Object original, Object target, Object owner) throws HibernateException {
        return original;
    }

    public int hashCode(Object x) throws HibernateException {
        return x.hashCode();
    }

    public boolean equals(Object x, Object y) throws HibernateException {
        if (x == y) {
            return true;
        }
        if (null == x || null == y) {
            return false;
        }
        return x.equals(y);
    }

}
