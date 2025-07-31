"use client";
import React from "react";
// import logoImg from "../../../public/images/diamond.png";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: "bold",
  },

  logo: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 24,
  },

  logoText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#948979",
  },

  logoImage: {
    width: 24,
    height: 24,
    marginRight: 5,
  },

  label: {
    fontWeight: "bold",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "start",
    gap: 15,
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 80,
  },
  attributes: {
    fontStyle: "italic",
    fontSize: 10,
  },
});

// Component
const OrderReceiptPDF = ({ order }) => {
  const {
    id,
    createdAt,
    customerDetails,
    payment_status,
    delivery_status,
    items,
    totalPrice,
  } = order;

  console.log("ORDER ===>", order);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.logo}>
          <Image src={"/images/diamond.png"} style={styles.logoImage} />
          <Text style={styles.logoText}>Zaplet</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Order Receipt</Text>
          <Text>
            <Text style={styles.label}>Order ID:</Text> {id}
          </Text>
          <Text>
            <Text style={styles.label}>Date:</Text>{" "}
            {new Date(createdAt).toLocaleString()}
          </Text>
          <Text>
            <Text style={styles.label}>Customer:</Text>{" "}
            {customerDetails?.fullName}
          </Text>
          <Text>
            <Text style={styles.label}>Phone:</Text> {customerDetails?.phone}
          </Text>
          <Text>
            <Text style={styles.label}>Address:</Text>{" "}
            {customerDetails?.address}
          </Text>
          <Text>
            <Text style={styles.label}>Payment Status:</Text> {payment_status}
          </Text>
          <Text>
            <Text style={styles.label}>Delivery Status:</Text> {delivery_status}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Items:</Text>
          {items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Image src={item.image} style={styles.image} />
              <View>
                <Text>
                  {item.product_name} X {item.quantity} — BDT{" "}
                  {(item.unit_discount_price * item.quantity).toLocaleString()}
                  /-
                </Text>
                <Text style={styles.attributes}>
                  {item?.attributes &&
                    Object.entries(item?.attributes)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(", ")}
                </Text>
                <Text>Merchant: {item.merchant}</Text>
                <Text>Product Code: {item.product_code}</Text>
                {item?.variant_code && (
                  <Text>Variant Code: {item?.variant_code}</Text>
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            Grand Total: BDT {totalPrice.toLocaleString()}/-
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default OrderReceiptPDF;
