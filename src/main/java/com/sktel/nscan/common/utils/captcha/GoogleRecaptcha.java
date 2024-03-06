package com.sktel.nscan.common.utils.captcha;

import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;

/**

 * Recaptcha V3 - Java Example

 */

@Slf4j
public class GoogleRecaptcha {


	private static final String RECAPTCHA_SERVICE_URL = "https://www.google.com/recaptcha/api/siteverify";
	private static final String SECRET_KEY = "6Ldur-wUAAAAAJlPZdLzKt2w84otTm5bn56pQKTH";



	
	/**
	* checks if a user is valid
	* @param clientRecaptchaResponse
	* @return true if human, false if bot
	* @throws IOException
	* @throws ParseException
	*/

	public static boolean isValid(String clientRecaptchaResponse) throws IOException, ParseException {

		if (clientRecaptchaResponse == null || "".equals(clientRecaptchaResponse)) {
			return false;
		}

		URL obj = new URL(RECAPTCHA_SERVICE_URL);
		HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();

		con.setRequestMethod("POST");
		con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");

		//add client result as post parameter
		String postParams =
		"secret=" + SECRET_KEY +
		"&response=" + clientRecaptchaResponse;

		// send post request to google recaptcha server
		con.setDoOutput(true);

		DataOutputStream wr = new DataOutputStream(con.getOutputStream());
		wr.writeBytes(postParams);
		wr.flush();
		wr.close();

		int responseCode = con.getResponseCode();

		log.info("Post parameters: " + postParams);
		log.info("Response Code: " + responseCode);

		BufferedReader in = new BufferedReader(new InputStreamReader(
		con.getInputStream()));

		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}

		in.close();
		log.info(response.toString());

		//Parse JSON-response
		JSONParser parser = new JSONParser();
		JSONObject json = (JSONObject) parser.parse(response.toString());

		Boolean success = (Boolean) json.get("success");
		Double score = (Double) json.get("score");

		log.info("success : " + success);
		log.info("score : " + score);

		//result should be sucessfull and spam score above 0.5
		return (success && score >= 0.5);
	}
}

