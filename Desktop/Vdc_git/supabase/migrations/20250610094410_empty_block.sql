/*
  # Seed Initial Data for Health Services Platform

  1. Specializations
    - Insert popular medical specializations
  
  2. Sample Data
    - Diagnostic centers
    - Doctors
    - Tests
    - Sample user data
*/

-- Insert specializations
INSERT INTO specializations (name, description, icon_name, color_code, is_popular) VALUES
('General Physician', 'Primary care doctors for general health concerns', 'Stethoscope', '#10B981', true),
('Dermatologist', 'Skin, hair, and nail specialists', 'Heart', '#F59E0B', true),
('Gynecologist', 'Women''s reproductive health specialists', 'Baby', '#EC4899', true),
('Eye Specialist', 'Vision and eye care specialists', 'Eye', '#8B5CF6', true),
('Cardiologist', 'Heart and cardiovascular specialists', 'Heart', '#EF4444', true),
('Neurologist', 'Brain and nervous system specialists', 'Brain', '#3B82F6', true),
('Orthopedist', 'Bone and joint specialists', 'Bone', '#06B6D4', true),
('Gastroenterologist', 'Digestive system specialists', 'Activity', '#84CC16', true),
('Pediatrician', 'Children''s health specialists', 'Baby', '#F97316', false),
('Psychiatrist', 'Mental health specialists', 'Brain', '#8B5CF6', false),
('ENT Specialist', 'Ear, nose, and throat specialists', 'Ear', '#14B8A6', false),
('Oncologist', 'Cancer treatment specialists', 'Shield', '#DC2626', false);

-- Insert diagnostic centers
INSERT INTO diagnostic_centers (name, description, address, city, state, pincode, phone, email, opening_hours, features, is_verified, is_nabl_certified, rating, total_reviews, image_url) VALUES
('Apollo Diagnostics', 'Leading healthcare provider offering comprehensive diagnostic services with state-of-the-art equipment and experienced professionals.', 'Bandra West, Mumbai', 'Mumbai', 'Maharashtra', '400050', '+91 98765 43210', 'contact@apollodiagnostics.com', '7:00 AM - 9:00 PM', '{"Home Collection", "Online Reports", "NABL Certified", "24/7 Service"}', true, true, 4.8, 342, 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800'),
('Dr. Lal PathLabs', 'Trusted diagnostic chain with advanced testing facilities and quick report delivery.', 'Andheri East, Mumbai', 'Mumbai', 'Maharashtra', '400069', '+91 98765 43211', 'info@lalpathlabs.com', '6:30 AM - 8:30 PM', '{"24/7 Service", "Express Reports", "Home Collection"}', true, true, 4.7, 567, 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=800'),
('SRL Diagnostics', 'Comprehensive diagnostic services with digital reports and ISO certification.', 'Powai, Mumbai', 'Mumbai', 'Maharashtra', '400076', '+91 98765 43212', 'support@srldiagnostics.com', '7:00 AM - 8:00 PM', '{"Home Collection", "Digital Reports", "ISO Certified"}', true, true, 4.6, 289, 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=800'),
('Metropolis Healthcare', 'AI-powered diagnostic reports with quick turnaround time.', 'Malad West, Mumbai', 'Mumbai', 'Maharashtra', '400064', '+91 98765 43213', 'care@metropolishealthcare.com', '6:00 AM - 9:00 PM', '{"AI-Powered Reports", "Home Collection", "Quick TAT"}', true, true, 4.5, 198, 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800'),
('Thyrocare Technologies', 'Budget-friendly diagnostic services with wellness packages.', 'Goregaon East, Mumbai', 'Mumbai', 'Maharashtra', '400063', '+91 98765 43214', 'hello@thyrocare.com', '7:30 AM - 7:30 PM', '{"Budget Friendly", "Home Collection", "Wellness Packages"}', true, true, 4.4, 156, 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800');

-- Insert tests for Apollo Diagnostics
INSERT INTO tests (diagnostic_center_id, name, description, parameters, price, original_price, report_time, preparation_required, sample_type, is_popular) VALUES
((SELECT id FROM diagnostic_centers WHERE name = 'Apollo Diagnostics'), 'Complete Blood Count (CBC)', 'Comprehensive blood analysis to check overall health status', '{"Hemoglobin", "RBC Count", "WBC Count", "Platelet Count", "Hematocrit", "MCV", "MCH", "MCHC"}', 299.00, 450.00, '4-6 hours', 'No special preparation required', 'Blood', true),
((SELECT id FROM diagnostic_centers WHERE name = 'Apollo Diagnostics'), 'Lipid Profile', 'Evaluates cardiovascular risk and cholesterol levels', '{"Total Cholesterol", "LDL Cholesterol", "HDL Cholesterol", "Triglycerides", "VLDL Cholesterol"}', 349.00, 500.00, '6-8 hours', '12-hour fasting required', 'Blood', true),
((SELECT id FROM diagnostic_centers WHERE name = 'Apollo Diagnostics'), 'Liver Function Test', 'Assesses liver health and function', '{"SGPT/ALT", "SGOT/AST", "Total Bilirubin", "Direct Bilirubin", "Alkaline Phosphatase", "Total Protein", "Albumin"}', 399.00, 600.00, '8-12 hours', 'No special preparation required', 'Blood', false),
((SELECT id FROM diagnostic_centers WHERE name = 'Apollo Diagnostics'), 'Kidney Function Test', 'Evaluates kidney health and function', '{"Serum Creatinine", "Blood Urea", "BUN", "Uric Acid", "Sodium", "Potassium", "Chloride"}', 299.00, 450.00, '6-8 hours', 'No special preparation required', 'Blood', false),
((SELECT id FROM diagnostic_centers WHERE name = 'Apollo Diagnostics'), 'Thyroid Profile', 'Comprehensive thyroid function assessment', '{"TSH", "T3 Total", "T4 Total", "Free T3", "Free T4"}', 449.00, 650.00, '12-24 hours', 'No special preparation required', 'Blood', true),
((SELECT id FROM diagnostic_centers WHERE name = 'Apollo Diagnostics'), 'Diabetes Profile', 'Complete diabetes screening and monitoring', '{"Fasting Glucose", "HbA1c", "Post Meal Glucose", "Fasting Insulin"}', 599.00, 850.00, '4-6 hours', 'Fasting required for glucose tests', 'Blood', true),
((SELECT id FROM diagnostic_centers WHERE name = 'Apollo Diagnostics'), 'Vitamin D Test', 'Measures vitamin D levels in blood', '{"25-Hydroxy Vitamin D"}', 799.00, 1200.00, '24-48 hours', 'No special preparation required', 'Blood', false),
((SELECT id FROM diagnostic_centers WHERE name = 'Apollo Diagnostics'), 'Vitamin B12 Test', 'Measures vitamin B12 levels', '{"Vitamin B12", "Folate"}', 699.00, 950.00, '12-24 hours', 'No special preparation required', 'Blood', false),
((SELECT id FROM diagnostic_centers WHERE name = 'Apollo Diagnostics'), 'Iron Studies', 'Complete iron profile assessment', '{"Serum Iron", "TIBC", "Transferrin Saturation", "Ferritin"}', 899.00, 1300.00, '12-24 hours', 'No special preparation required', 'Blood', false),
((SELECT id FROM diagnostic_centers WHERE name = 'Apollo Diagnostics'), 'Cardiac Markers', 'Heart health assessment markers', '{"Troponin I", "CK-MB", "LDH", "CPK Total"}', 1299.00, 1800.00, '6-12 hours', 'No special preparation required', 'Blood', false);

-- Insert sample doctors
INSERT INTO doctors (specialization_id, registration_number, experience_years, qualifications, bio, consultation_fee, video_consultation_fee, audio_consultation_fee, home_visit_fee, hospital_name, hospital_address, languages, awards, conditions_treated, is_verified, rating, total_reviews, total_consultations) VALUES
((SELECT id FROM specializations WHERE name = 'Cardiologist'), 'MH12345', 12, '{"MBBS", "MD Cardiology", "Fellowship in Interventional Cardiology"}', 'Dr. Sarah Johnson is a renowned cardiologist with over 12 years of experience in treating cardiovascular diseases. She specializes in interventional cardiology and has performed over 2000 successful procedures.', 1000.00, 800.00, 600.00, 1500.00, 'Apollo Hospital', 'Bandra, Mumbai', '{"English", "Hindi"}', '{"Best Cardiologist 2023", "Excellence in Patient Care 2022"}', '{"Heart Disease", "Hypertension", "Arrhythmia", "Chest Pain", "Heart Attack", "Coronary Artery Disease", "Heart Failure"}', true, 4.9, 256, 1200),
((SELECT id FROM specializations WHERE name = 'Dermatologist'), 'MH12346', 8, '{"MBBS", "MD Dermatology"}', 'Dr. Michael Chen is an experienced dermatologist specializing in skin disorders, cosmetic dermatology, and hair treatments.', 650.00, 600.00, 450.00, 1200.00, 'Fortis Hospital', 'Andheri, Mumbai', '{"English"}', '{}', '{"Acne", "Eczema", "Psoriasis", "Hair Loss", "Skin Cancer", "Cosmetic Procedures"}', true, 4.8, 189, 850),
((SELECT id FROM specializations WHERE name = 'Gynecologist'), 'MH12347', 15, '{"MBBS", "MS Gynecology"}', 'Dr. Priya Sharma is a highly experienced gynecologist with expertise in women''s reproductive health and pregnancy care.', 750.00, 700.00, 550.00, 1300.00, 'Lilavati Hospital', 'Bandra, Mumbai', '{"English", "Hindi", "Tamil"}', '{"Excellence in Women''s Health"}', '{"Pregnancy Care", "PCOS", "Menstrual Disorders", "Infertility", "Menopause"}', true, 4.9, 342, 1500),
((SELECT id FROM specializations WHERE name = 'Orthopedist'), 'MH12348', 10, '{"MBBS", "MS Orthopedics"}', 'Dr. Rajesh Kumar specializes in bone and joint disorders with expertise in sports medicine and joint replacement.', 700.00, 650.00, 500.00, 1400.00, 'Hinduja Hospital', 'Mahim, Mumbai', '{"English", "Hindi"}', '{}', '{"Fractures", "Arthritis", "Sports Injuries", "Joint Pain", "Back Pain"}', true, 4.7, 178, 900),
((SELECT id FROM specializations WHERE name = 'Pediatrician'), 'MH12349', 9, '{"MBBS", "MD Pediatrics"}', 'Dr. Emily Davis is a caring pediatrician with extensive experience in child healthcare and development.', 600.00, 550.00, 400.00, 1100.00, 'Kokilaben Hospital', 'Andheri, Mumbai', '{"English", "Hindi"}', '{"Child Care Excellence Award"}', '{"Child Development", "Vaccinations", "Childhood Infections", "Growth Disorders"}', true, 4.8, 223, 1100);

-- Update doctors table with user_id (this would normally be done during user registration)
-- For demo purposes, we'll leave user_id as NULL since we don't have actual user accounts yet

-- Insert sample reviews
INSERT INTO reviews (doctor_id, rating, comment, is_verified) VALUES
((SELECT id FROM doctors WHERE registration_number = 'MH12345'), 5, 'Excellent doctor! Very thorough examination and clear explanation of the condition.', true),
((SELECT id FROM doctors WHERE registration_number = 'MH12345'), 5, 'Dr. Johnson is very professional and caring. Highly recommended for heart problems.', true),
((SELECT id FROM doctors WHERE registration_number = 'MH12345'), 4, 'Good consultation. The doctor listened to all my concerns patiently.', true),
((SELECT id FROM doctors WHERE registration_number = 'MH12346'), 5, 'Great dermatologist! Solved my skin problem effectively.', true),
((SELECT id FROM doctors WHERE registration_number = 'MH12346'), 4, 'Professional service and good results.', true),
((SELECT id FROM doctors WHERE registration_number = 'MH12347'), 5, 'Excellent care during pregnancy. Very supportive and knowledgeable.', true),
((SELECT id FROM doctors WHERE registration_number = 'MH12347'), 5, 'Best gynecologist in the city. Highly recommended.', true);

-- Insert sample reviews for diagnostic centers
INSERT INTO reviews (diagnostic_center_id, rating, comment, is_verified) VALUES
((SELECT id FROM diagnostic_centers WHERE name = 'Apollo Diagnostics'), 5, 'Excellent service and accurate reports. Staff is very professional.', true),
((SELECT id FROM diagnostic_centers WHERE name = 'Apollo Diagnostics'), 4, 'Good facilities and timely reports. Home collection service is convenient.', true),
((SELECT id FROM diagnostic_centers WHERE name = 'Dr. Lal PathLabs'), 5, 'Quick and reliable service. Reports are always on time.', true),
((SELECT id FROM diagnostic_centers WHERE name = 'Dr. Lal PathLabs'), 4, 'Professional staff and good collection process.', true);