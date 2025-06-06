# Hardware Implementation
- [ ] offline mode (download prescription)
- [ ] **buttons**: arrows (4), ON/OFF, OK button
- [ ] **Alarm/notification settings modes:** screen flash & mute**, **vibrations only**, **sound on**
- [ ]  Different alarm sounds available
# Software Implementation / Algorithm
- [ ] Serialization of the data taken from the doctor's form into .pdf format (for export or printing reasons)
- [ ] Take the data from this form and send it to the device in the format of variables (takes some bytes)
# Website
- [ ] Forms
	- [ ] Patient form - to complete more information about certain conditions they already have (such as allergies)
	- [ ] Medical staff form (for the prescription)
- [ ] Profile setups
	- [ ] For patient, more information should be included (like birthday, full name and valid email)
		- [ ] additional information can be setup in the patient form from above
# Questions
- [ ] Secure Network connection? How to send the data? Prevent interception of data
- [ ] How to display multiple meds that have to be taken 

# Potential Ideas
- [ ] Possibility to do something with the outcoming requests of ESP
- [ ] Minimap with clinics near the user (implemented only for the patients)
	- requires internet connection, so supposedly this will only be done for the website
- [ ] Pop-ups that have a short tutorial on how to use the website and the device
- [ ] Mobile friendly implementation
- [ ] Patient reviews zone
- [ ] Info center (?) - **not developed yet**
- [ ] Patient form:
	- [ ] Ability to request a doctor's note to go for medical tests (eg. blood test)
	- [ ] Ability to request a prescription for colds, doctor's note for such situation, etc. (**NOTE: THEY SHOULD NOT REQUIRE A CHECKUP AND IF THEY DO, TO LET THE PATIENT KNOW**) (?)
