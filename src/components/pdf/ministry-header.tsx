import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottom: "2px solid #111111",
    marginBottom: 5,
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 40,
    height: 40,
    backgroundColor: "#111111",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 700,
  },
  ministryInfo: {
    textAlign: "right",
  },
  title: {
    fontSize: 14,
    fontWeight: 700,
    color: "#111111",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 9,
    color: "#615e5b",
  },
  yearBadge: {
    backgroundColor: "#ff9900",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  yearText: {
    fontSize: 10,
    fontWeight: 700,
    color: "#111111",
  },
  decorative: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ff9900",
  },
});

export function MinistryHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.logoSection}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>ت</Text>
        </View>
        <View style={styles.ministryInfo}>
          <Text style={styles.title}>وزارة التعليم</Text>
          <Text style={styles.subtitle}>المملكة العربية السعودية</Text>
        </View>
      </View>
      <View style={styles.decorative}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.yearBadge}>
          <Text style={styles.yearText}>1447هـ</Text>
        </View>
      </View>
    </View>
  );
}