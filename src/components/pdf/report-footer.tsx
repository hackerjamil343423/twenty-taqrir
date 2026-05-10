import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 15,
    left: 40,
    right: 40,
    borderTop: "1px solid #e9eaeb",
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  logoSmall: {
    width: 20,
    height: 20,
    backgroundColor: "#111111",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  logoTextSmall: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: 700,
  },
  brandName: {
    fontSize: 9,
    color: "#615e5b",
  },
  right: {
    textAlign: "left",
  },
  url: {
    fontSize: 8,
    color: "#615e5b",
  },
  divider: {
    width: 1,
    height: 12,
    backgroundColor: "#e9eaeb",
    marginHorizontal: 8,
  },
});

export function ReportFooter() {
  const year = new Date().getFullYear();
  return (
    <View style={styles.container} fixed>
      <View style={styles.left}>
        <View style={styles.logoSmall}>
          <Text style={styles.logoTextSmall}>ت</Text>
        </View>
        <Text style={styles.brandName}>تقارير تونتي</Text>
        <View style={styles.divider} />
        <Text style={styles.url}>taqriri.sa</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.url}>© {year} جميع الحقوق محفوظة</Text>
      </View>
    </View>
  );
}